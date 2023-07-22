export interface Category {
    active: number;
    depth: number;
    description: string;
    hide_description: number;
    icon_class: string;
    id: number;
    is_for_permanent: number;
    lft: number;
    name: string;
    parentClosure: Category | null;
    parent_id: number | null;
    picture: string;
    picture_url: string;
    rgt: number;
    seo_description: string;
    seo_keywords: string;
    seo_title: string;
    slug: string;
    type: string;
}
