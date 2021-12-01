module.exports = {
    future: {},
    purge: [],
    theme: {
        extend: {},
        textColor: theme => ({
            ...theme('colors'),
            'primary': '#22577A',
            'secondary': '#38A3A5',
            'danger': '#b41e00'
        }),
        backgroundColor: theme => ({
            ...theme('colors'),
            'primary': '#22577A',
            'secondary': '#38A3A5',
            'danger': '#b41e00'
        })
    },
    variants: {},
    plugins: []
};