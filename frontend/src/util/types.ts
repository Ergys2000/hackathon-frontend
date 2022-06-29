
export type User = {
    id: number;
    username: string;
    password: string;
    adress: string;
    city: string;
    email: string;
    latitude: number;
    longitude: number;
    state: string;
};

export type Campsite = {
    id: number;
    name: string;
    description: string;
    longitude: number;
    latitude: number;
    user: User;
    capacity: number;
    price: number;
};

export type Reservation = {
    id: number;
    startDate: string;
    endDate: string;
    people: number;
    campsite: Campsite;
    guest: User;
}