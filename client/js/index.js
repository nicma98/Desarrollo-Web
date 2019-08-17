
class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        $.get(url, (response) => {
            this.inicializarCalendario(response)
        })
    }

    actualizarEvento(event){
        let idEvent = event.id
        let start = event.start['_d']
        let end = event.end['_d']
        let ev = {
            id: idEvent,
            start: start,
            end: end
        }
        let url = '/events/reload'
        $.post(url, ev, (response) => {
            alert(response)
        })
    }

    eliminarEvento(evento) {
        let eventId = evento.id
        $.post('/events/delete', {id: eventId}, (response) => {
            alert(response)
        })
        this.obtenerDataInicial()
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let title = $('#titulo').val()

            if ($('#allDay').prop( "checked" )) {
                var start = $('#start_date').val()
                var start_hour = '00:00:00'
                var end = start + 'T' + '23:59:59'
                var start = start + 'T' + start_hour
            }else{
                var start = $('#start_date').val()
                var start_hour = $('#start_hour').val()
                var start = start + 'T' + start_hour
                var end = $('#end_date').val()
                var end_hour = $('#end_hour').val()
                var end = end + 'T' + end_hour
            }
            let url = this.urlBase + "/new"
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end
                }
                $.post(url, ev, (response) => {
                    alert(response)
                })
                $('#calendario').fullCalendar('renderEvent', ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '00:00:00',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '00:00:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {
        $('#calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2019-08-01',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: eventos,
            height: 600,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "img/delete.png");
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('#calendario').fullCalendar('removeEvents', event.id);
                    }
                }
            })
    }
}

    const Manager = new EventManager()
