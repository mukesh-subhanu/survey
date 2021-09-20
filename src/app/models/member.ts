export interface Member {
    id: number;
    houseNo: string;
    houseAddress: string;
    members?: {
        name: string,
        age: number,
        gender: string
    }[]
}
