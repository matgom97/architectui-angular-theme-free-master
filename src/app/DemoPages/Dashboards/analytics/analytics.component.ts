import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { faTh, faCheck, faTrash, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';

// Importar modal 



@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  //changeDetection: ChangeDetectionStrategy.Default,
  standalone: false})
export class AnalyticsComponent {

  creditos: any[] = [];

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.creditosList();
    console.log(this.creditos);
  }

  

  faTh = faTh;
  faCheck = faCheck;
  faTrash = faTrash;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  heading = 'Analytics Dashboard';
  subheading = 'This is an example dashboard created using build-in elements and components.';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';

  slideConfig6 = {
    className: 'center',
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    adaptiveHeight: true,
    dots: true,
  };

  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Helpdesk Tickets',
        data: [65, 59, 80, 81, 56, 55, 40, 48],
        backgroundColor: 'rgba(247, 185, 36, 0.2)',
        borderColor: '#f7b924',
        borderWidth: 4,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#f7b924',
        pointBorderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };
  
  public datasets = [
    {
      label: 'My First dataset',
      data: [65, 59, 80, 81, 46, 55, 38, 59, 80],
      datalabels: {
        display: false,
      },

    }
  ];

  public datasets2 = [
    {
      label: 'My First dataset',
      data: [46, 55, 59, 80, 81, 38, 65, 59, 80],
      datalabels: {
        display: false,
      },

    }
  ];

  public datasets3 = [
    {
      label: 'My First dataset',
      data: [65, 59, 80, 81, 55, 38, 59, 80, 46],
      datalabels: {
        display: false,
      },

      // Colors now configured in dataset
      backgroundColor: 'rgba(247, 185, 36, 0.2)',
      borderColor: '#f7b924',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#f7b924',
      pointBackgroundColor: '#fff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#f7b924',
    }
  ];

  public lineChartColors2 = [
    { // dark grey
      backgroundColor: 'rgba(48, 177, 255, 0.2)',
      borderColor: '#30b1ff',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#30b1ff',
      pointBackgroundColor: '#ffffff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#30b1ff',
    },
  ];

  public lineChartColors3 = [
    { // dark grey
      backgroundColor: 'rgba(86, 196, 121, 0.2)',
      borderColor: '#56c479',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#56c479',
      pointBackgroundColor: '#fff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#56c479',
    },
  ];

  public labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];

  public options = {
    layout: {
      padding: {
        left: 0,
        right: 8,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      y: {
        ticks: {
          display: false,
          beginAtZero: true
        },
        grid: {
          display: false
        }
      },
      x: {
        ticks: {
          display: false
        },
        grid: {
          display: false
        }
      }
    },
    plugins: { 
      legend: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  showModals: boolean = false;

  isCreation: boolean = false; // Variable para determinar si es creación o edición

  // Emitir estado del modal
  creditoModal() {
    this.showModals = true;
    this.isCreation = true; // Establecer como creación al abrir el modal
    this.selectedCredito = null; // Limpiar el crédito seleccionado al abrir el modal
    this.isView = false;
    console.log('Modal abierto');
  }

  cerrarModal(): void {
  this.showModals = false;
}



creditosList(): void {
  console.log("llegue aqui ");
  
  this.http.get<{ data: any[] }>('http://localhost:8000/api/creditos')
    .subscribe({
      next: (resp) => {
        console.log(resp);
        
        this.creditos = resp.data;
        this.cd.detectChanges();
        console.log('Lista de créditos:', this.creditos);
      },
      error: (err) => console.error(err)
    });

    console.log("sali de la peticion");
}

eliminarCredito(id: number): void {
  this.http.delete(`http://localhost:8000/api/creditos/destroy`, { params: { id: id } })
    .subscribe({
      next: () => {
        console.log(`Crédito con ID ${id} eliminado`);
        // Actualizar la lista de créditos después de eliminar
        this.creditosList();
        this.cd.detectChanges();

      },
      error: (err) => console.error(err)
    });

  }
  selectedCredito: any = null; // Variable para almacenar el crédito seleccionado para edición

  editarCredito(credito: any): void {
    // Aquí puedes implementar la lógica para editar un crédito
    console.log('Editar crédito:', credito);
    this.isCreation = false; // Establecer como edición al abrir el modal
    this.selectedCredito = credito;
    this.showModals = true;
    this.isView =   false; // Establecer como edición al abrir el modal 
  }

  guardarCredito(credito: any): void {
    // Aquí puedes implementar la lógica para guardar un crédito
    console.log('Guardar crédito:', credito);
    this.creditosList(); // Actualizar la lista de créditos después de guardar
  }

  isView: boolean = false; // Variable para determinar si es vista o edición
  verCredito(credito: any): void {
    // Aquí puedes implementar la lógica para ver un crédito
    console.log('Ver crédito:', credito);
    this.isCreation = false;
    this.selectedCredito = credito;
    this.showModals = true;
    this.isView = true; // Establecer como vista al abrir el modal
  }

}