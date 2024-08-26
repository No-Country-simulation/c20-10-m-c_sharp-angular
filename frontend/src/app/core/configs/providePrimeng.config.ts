import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

export const providePrimengConfig = [MessageService, ToastModule];
