export interface Task {
  id: string;
  title: string;
  due?: string;
  completed: boolean;
  notes?: string;
}

export enum StorageKeys {
  TASKS = 'tasks',
  USER_SETTINGS = 'user_settings',
  THEME = 'theme_preference',
  TASKS_PREFIX = '@MyApp:tasks_'
}

export enum AccessibilityRole {
  BUTTON = 'button',
  HEADER = 'header',
  LINK = 'link',
  IMAGE = 'image',
  IMAGEBUTTON = 'imagebutton',
  TEXT = 'text',
  NONE = 'none',
  SEARCH = 'search',
  ADJUSTABLE = 'adjustable',
}