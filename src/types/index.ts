export interface Event {
  title: string;
  date: Date;
  time: string;
  address: string;
  addressUrl: string;
}

export interface CongratulationsMessage {
  id: string;
  name: string;
  message: string;
  created_at: Date;
}

export interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}
