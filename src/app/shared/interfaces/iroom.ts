
export interface IRoom {
    roomId:        number;
    number:        string;
    type:          string;
    pricePerNight: number;
    isAvailable:   boolean;
    description:   string;
    images:        string[];
}
