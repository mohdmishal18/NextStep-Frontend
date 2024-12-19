
export interface blog {
    _id?: string;
    authorId?: string
    title: string;
    content: string;
    coverImage: string;
    tags: string[]
    isPublished: boolean; 
    createdAt: Date;
    updatedAt:Date;
}

export interface BlogFormProps {
  initialData?: Partial<blog>;
  onSubmit: (data: Omit<blog, "_id" | "authorId" | "createdAt" | "updatedAt">) => void;
}
