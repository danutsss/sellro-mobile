interface Extra {
    authToken: string;
    tokenType: string;
    isAdmin: boolean;
}

interface Result {
    id: number;
    name: string;
    username: string | null;
    country_code: string;
    language_code: string | null;
    user_type_id: number;
    gender_id: number;
    photo: string | null;
    about: string;
    auth_field: string;
    email: string;
    phone: string;
    phone_national: string;
    phone_country: string;
    phone_hidden: number;
    disable_comments: number;
    ip_addr: string | null;
    provider: string | null;
    provider_id: string | null;
    email_token: string | null;
    phone_token: string | null;
    email_verified_at: string | null;
    phone_verified_at: string | null;
    accept_terms: number;
    accept_marketing_offers: number;
    time_zone: string | null;
    blocked: number;
    closed: number;
    last_activity: string;
    phone_intl: string;
    updated_at: string;
    original_updated_at: string;
    original_last_activity: string | null;
    created_at_formatted: string;
    photo_url: string;
    p_is_online: boolean;
    country_flag_url: string;
}

export interface User {
    extra: Extra;
    result: Result;
}
