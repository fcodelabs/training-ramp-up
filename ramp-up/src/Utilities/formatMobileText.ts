export const formatMobileDisplay = (mobile: string) => {
    const numericMobile = mobile.replace(/\D/g, '');
    if (numericMobile.startsWith('94')) {
        const formattedMobile = '0' + numericMobile.slice(2);

        return formattedMobile.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else {
        return numericMobile.replace(/^\+/, '').replace(/(\d{3})(\d{3})(\d{3,})/, '$1-$2-$3');
    }
};