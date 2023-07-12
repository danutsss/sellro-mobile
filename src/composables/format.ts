export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO", {
        style: "currency",
        currency: "lei",
        minimumFractionDigits: 0,
    })
        .format(price)
        .toLocaleLowerCase();
};

export const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("ro-RO", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(date));
};
