
declare interface UserSchema {
    name: string;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'creator' |  'client';
    uid?: any
}

interface category {
    category?: string;
    subCategory?: string;
}

declare interface CreatorSchema {
    userId: string;
    name: string;
    creations: string;
    categories: Array<category | string>;
}

declare interface CategoriesSchema {
    name: string;
    description: string;
}

declare interface SubCategoriesSchema {
    name: string;
    description: string;
}

declare interface RateSchema {
    creatorId: string | CreatorSchema;
    name: string;
    price: number;
    benefits: string[];
    type: 'basic' | 'premiun' | 'gold';
}

declare interface ContractSchema {
    rateId: string[] | RateSchema[];
    userId: string;
    creatorId: string | CreatorSchema;
    name: string;
    description: string;
    charged: boolean;
    paidOut: boolean;
}

declare interface StatusContractSchema {
    contractId: string;
    description: string;
    stage: string;
}