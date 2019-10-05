export interface UsersLookupPart {
    id: number;
    firstname: string;
    lastname: string;
}

export interface UsersDto extends UsersLookupPart {
    technologies: [string[]];
    certifications: string[];
    experience: string[];
}
