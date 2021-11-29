module.exports = {
    future: {},
    purge: [],
    theme: {
        extend: {},
        textColor: theme => ({
            ...theme('colors'),
            'primary': '#114b5f',
            'secondary': '#028090',
            'danger': '#b41e00'
        }),
        backgroundColor: theme => ({
            ...theme('colors'),
            'primary': '#114b5f',
            'secondary': '#028090',
            'danger': '#b41e00'
        })
    },
    variants: {},
    plugins: []
};