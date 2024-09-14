export interface Message {
  message: string;
  createdAt: Date;
  userId: string;
}

export interface MessageResponse {
  id:        number;
  message:   string;
  createdAt: string;
  userId:    string;
}
