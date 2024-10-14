import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                border: '#F1F1F1',
                input: '#F1F1F1',
                ring: '#000',
                'main-primary': {
                    100: '#828997',
                    200: '#515761',
                    300: '#3a3e46',
                    400: '#0c0c0e',
                    500: '#0F1012',
                    600: '#0c0c0e',
                    700: '#0a0a0c',
                    800: '#080809',
                },
            },
            fontFamily: {
                inter: ['Inter'],
                aeonik: ['Aeonik']
            },
            aspectRatio: {
                auto: 'auto',
                square: '1 / 1',
                video: '16 / 9'
            }
        }
    }
}
