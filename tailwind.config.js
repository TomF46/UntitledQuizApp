module.exports = {
    future: {},
    purge: [],
    theme: {
        extend: {},
        backgroundColor: theme => ({
            ...theme('colors'),
            'primary': '#05668d',
            'secondary': '#02c39a',
            'danger': '#b41e00'
        })
    },
    variants: {},
    plugins: []
};
