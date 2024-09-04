export interface CategoryList {
  value: CategoryListValue;
  label: string;
}

export interface CategoryListValue {
  id: string;
  url: string;
}

export const CATEGORIES_LIST: CategoryList[] = [
  { value: { id: '0', url: 'electricista' }, label: 'Electricista' },
  { value: { id: '1', url: 'plomero' }, label: 'Plomero' },
  { value: { id: '2', url: 'jardinero' }, label: 'Jardinero' },
  { value: { id: '3', url: 'carpintero' }, label: 'Carpintero' },
  { value: { id: '4', url: 'albañil' }, label: 'Albañil' },
  { value: { id: '5', url: 'pintor' }, label: 'Pintor' },
  { value: { id: '6', url: 'cerrajero' }, label: 'Cerrajero' },
  { value: { id: '7', url: 'mecanico' }, label: 'Mecánico' },
  {
    value: { id: '8', url: 'instalador-de-aire-acondicionado' },
    label: 'Instalador de aire acondicionado',
  },
  {
    value: { id: '9', url: 'tecnico-en-electrodomesticos' },
    label: 'Técnico en electrodomésticos',
  },
  { value: { id: '10', url: 'gasfitero' }, label: 'Gasfitero' },
  { value: { id: '11', url: 'herrero' }, label: 'Herrero' },
  { value: { id: '12', url: 'cristalero' }, label: 'Cristalero' },
  { value: { id: '13', url: 'tapicero' }, label: 'Tapicero' },
  { value: { id: '14', url: 'fontanero' }, label: 'Fontanero' },
  { value: { id: '15', url: 'yesero' }, label: 'Yesero' },
  { value: { id: '16', url: 'soldador' }, label: 'Soldador' },
  { value: { id: '17', url: 'tecnico-en-calefaccion' }, label: 'Técnico en calefacción' },
  { value: { id: '18', url: 'techador' }, label: 'Techador' },
  { value: { id: '19', url: 'montador-de-muebles' }, label: 'Montador de muebles' },
  { value: { id: '20', url: 'limpiador-de-piscinas' }, label: 'Limpiador de piscinas' },
  { value: { id: '21', url: 'fumigador' }, label: 'Fumigador' },
  { value: { id: '22', url: 'mudanza-y-transporte' }, label: 'Mudanza y transporte' },
  { value: { id: '23', url: 'servicio-de-limpieza' }, label: 'Servicio de limpieza' },
  {
    value: { id: '24', url: 'reparador-de-electrodomesticos' },
    label: 'Reparador de electrodomésticos',
  },
];
