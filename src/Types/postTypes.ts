export interface postForm {
    userid: string
    title: string;
    image: string;
    tags: string[]
    content: string;
}

export interface SearchPostFilters {
    title: string;
    page?: number;
    limit?: number;
  }
  
  export interface SearchPostResult {
    posts: any[];
    total: number;
  }
    
    