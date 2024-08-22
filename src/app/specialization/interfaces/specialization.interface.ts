import { Profile } from "src/app/profile/interfaces/profile.interface"

export interface Specialization {
    id?: number,
    profile_id: Profile,
    name: string,
    description: string
}