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
  name: string;
  message: string;
  timestamp: Date;
}

export interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}
