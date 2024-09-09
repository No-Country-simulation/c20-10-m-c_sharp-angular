import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User, Representative } from '../../api/user';
import { UserService } from '../../service/user.service';
import { Table, TableModule } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './usuarios-dashboard.component.html',
    providers: [MessageService, ConfirmationService],
   // standalone: true,
    //imports: [TableModule]
})
export class UsuariosDashboardDemoComponent implements OnInit {

    usuarios1: User[] = [];
    usuarios2: User[] = [];
    usuarios3:User[] = [];

    selectedUsuarios1: User[] = [];
    
    representantes: Representative[] = [];
    estados: any[] = [];

   // productos: Producto[] = [];
    rowGroupMetadata: any;

    expandedRows: expandedRows = {};
    activityValues: number[] = [0, 100];
    isExpanded: boolean = false;
    idFrozen: boolean = false;
    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getUsersLarge().then(usuarios => {
            this.usuarios1 = usuarios;
            this.loading = false;
            this.usuarios1.forEach(usuario => usuario.fecha = new Date(usuario.fecha));
        });

        this.userService.getUsersMedium().then(usuarios => this.usuarios2 = usuarios);
        this.userService.getUsersLarge().then(usuarios => this.usuarios3 = usuarios);

       
        this.representantes = [
            { nombre: 'Amy Elsner', imagen: 'amyelsner.png' },
            { nombre: 'Anna Fali', imagen: 'annafali.png' },
            { nombre: 'Asiya Javayant', imagen: 'asiyajavayant.png' },
            { nombre: 'Bernardo Dominic', imagen: 'bernardodominic.png' },
            { nombre: 'Elwin Sharvill', imagen: 'elwinsharvill.png' },
            { nombre: 'Ioni Bowcher', imagen: 'ionibowcher.png' },
            { nombre: 'Ivan Magalhaes', imagen: 'ivanmagalhaes.png' },
            { nombre: 'Onyama Limba', imagen: 'onyamalimba.png' },
            { nombre: 'Stephen Shaw', imagen: 'stephenshaw.png' },
            { nombre: 'XuXue Feng', imagen: 'xuxuefeng.png' }
        ];

        this.estados = [
            { label: 'No calificado', value: 'no_calificado' },
            { label: 'Calificado', value: 'calificado' },
            { label: 'Nuevo', value: 'nuevo' },
            { label: 'Negociación', value: 'negociacion' },
            { label: 'Renovación', value: 'renovacion' },
            { label: 'Propuesta', value: 'propuesta' }
        ];
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};
        if (this.usuarios3) {
            for (let i = 0; i < this.usuarios3.length; i++) {
                const rowData = this.usuarios3[i];
                const representanteNombre = rowData?.representative?.nombre || '';

                if (i === 0) {
                    this.rowGroupMetadata[representanteNombre] = { index: 0, size: 1 };
                } else {
                    const previousRowData = this.usuarios3[i - 1];
                    const previousRowGroup = previousRowData?.representative?.nombre;
                    if (representanteNombre === previousRowGroup) {
                        this.rowGroupMetadata[representanteNombre].size++;
                    } else {
                        this.rowGroupMetadata[representanteNombre] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    // expandAll() {
    //     if (!this.isExpanded) {
    //         this.productos.forEach(producto => producto && producto.nombre ? this.expandedRows[producto.nombre] = true : '');
    //     } else {
    //         this.expandedRows = {};
    //     }
    //     this.isExpanded = !this.isExpanded;
    // }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

}
