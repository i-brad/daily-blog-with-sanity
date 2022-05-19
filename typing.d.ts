import { Category } from './typing.d';

export interface Post {
    _id: string;
    title: string;
    _createdAt: string;
    _updatedAt: string;
    author: {
        name: string;
        image: string;
    };
    description: string;
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    body: [object];
    comments: Comment[];
    likes: number;
    categories: Category[]
}

export interface Comment {
    comment: string;
    name: string;
    _createdAt: string;
    _id: string;
}

export interface Trends {
    _id: string;
    title: string;
    description: string;
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
}

export interface Category {
    _id: string;
    title: string;
}