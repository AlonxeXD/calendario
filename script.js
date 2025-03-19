document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const currentYear = 2025;
    const toast = document.getElementById('toast'); // Seleccionar el toast
  
    // Lista de feriados en 2025 (fecha y nombre del feriado)
    const holidays = [
      { date: '2025-01-01', name: 'Año Nuevo' },
      { date: '2025-05-01', name: 'Día del Trabajo' },
      { date: '2025-06-15', name: 'Aniversario' },
      { date: '2025-12-25', name: 'Navidad' },
      // Otros feriados, puedes agregar más aquí
    ];
  
    // Datos de los meses
    const months = [
      { name: 'Enero', days: 31 },
      { name: 'Febrero', days: 28 }, // 2025 no es bisiesto
      { name: 'Marzo', days: 31 },
      { name: 'Abril', days: 30 },
      { name: 'Mayo', days: 31 },
      { name: 'Junio', days: 30 },
      { name: 'Julio', days: 31 },
      { name: 'Agosto', days: 31 },
      { name: 'Septiembre', days: 30 },
      { name: 'Octubre', days: 31 },
      { name: 'Noviembre', days: 30 },
      { name: 'Diciembre', days: 31 },
    ];
  
    const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
    // Función para obtener el primer día del mes
    function getFirstDayOfMonth(year, month) {
      const date = new Date(year, month, 1);
      return date.getDay(); // Retorna el día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
    }
  
    // Función para crear un mes
    function createMonth(year, monthIndex) {
      const month = months[monthIndex];
      const firstDay = getFirstDayOfMonth(year, monthIndex); // Día de la semana del primer día del mes
      const monthContainer = document.createElement('div');
      monthContainer.classList.add('month');
      monthContainer.setAttribute('data-month', monthIndex); // Establece un identificador único para cada mes
  
      // Nombre del mes
      const monthName = document.createElement('div');
      monthName.classList.add('month-name');
      monthName.textContent = month.name;
      monthContainer.appendChild(monthName);
  
      // Crear la fila de los días de la semana
      const weekdaysContainer = document.createElement('div');
      weekdaysContainer.classList.add('weekdays');
      weekdays.forEach(weekday => {
        const weekdayDiv = document.createElement('div');
        weekdayDiv.textContent = weekday;
        weekdaysContainer.appendChild(weekdayDiv);
      });
      monthContainer.appendChild(weekdaysContainer);
  
      // Crear los días del mes
      const daysContainer = document.createElement('div');
      daysContainer.classList.add('days');
  
      // Llenar los días antes del primer día (vacíos)
      for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        daysContainer.appendChild(emptyDiv);
      }
  
      // Crear los días del mes
      for (let day = 1; day <= month.days; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        dayDiv.setAttribute('data-day', `${monthIndex + 1}-${day}`); // Asignar un identificador único para cada día
  
        // Verificar si el día es feriado
        const dayDate = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const holiday = holidays.find(holiday => holiday.date === dayDate);
        if (holiday) {
          dayDiv.classList.add('holiday');
        }
  
        // Agregar la función para marcar el día con una "X"
        dayDiv.addEventListener('click', () => {
          if (dayDiv.textContent !== '') {
            dayDiv.classList.toggle('marked');
            dayDiv.textContent = dayDiv.classList.contains('marked') ? 'X' : day;
          }
        });
  
        daysContainer.appendChild(dayDiv);
      }
  
      monthContainer.appendChild(daysContainer);
      calendar.appendChild(monthContainer);
    }
  
    // Crear el calendario para cada mes de 2025
    months.forEach((_, index) => createMonth(currentYear, index));
  
    // Función para guardar los cambios de los días marcados en localStorage
    function saveChanges() {
      const markedDays = [];
      const allDays = document.querySelectorAll('.days div');
      allDays.forEach(day => {
        if (day.classList.contains('marked')) {
          markedDays.push(day.getAttribute('data-day')); // Guardar el identificador único del día
        }
      });
  
      localStorage.setItem('markedDays', JSON.stringify(markedDays)); // Guardar en localStorage
      
      // Mostrar la notificación (toast)
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000); // El toast desaparecerá después de 3 segundos
    }
  
    // Función para cargar los días marcados desde localStorage
    function loadMarkedDays() {
      const markedDays = JSON.parse(localStorage.getItem('markedDays')) || [];
      markedDays.forEach(dayId => {
        const dayElement = document.querySelector(`[data-day="${dayId}"]`);
        if (dayElement) {
          dayElement.classList.add("marked");
          dayElement.textContent = 'X'; // Marcar el día con 'X'
        }
      });
    }
  
    // Cargar los días marcados al inicio
    loadMarkedDays();
  
    // Asegurarnos de que solo se guarde cuando se presione el botón "Guardar Cambios"
    const saveButton = document.querySelector('.save-button');
    saveButton.addEventListener('click', function () {
      saveChanges();
    });
  });
  