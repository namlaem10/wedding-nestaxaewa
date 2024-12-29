export interface Event {
  title: string;
  date: Date;
  time: string;
  venue: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
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
