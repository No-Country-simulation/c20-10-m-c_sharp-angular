export interface ThemeList {
  title: string;
  prefix: string;
  colors: Colors[];
}

interface Colors {
  color: string;
  previewColor: string;
}

export interface Theme {
  name: string;
  color: string;
  mode: ThemeMode;
}

export type ThemeMode = 'dark' | 'light';
