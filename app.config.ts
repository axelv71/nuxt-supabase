export default defineAppConfig({
    ui: {
        primary: 'main-primary',
        button: {
            variant: {
                'solid': 'bg-primary hover:bg-primary/95 text-white rounded-full text-base font-normal py-3 px-4',
                outline: 'rounded-full text-base font-normal py-3 ring-border hover:bg-primary/5',
            }
        },
        input: {
            rounded: 'rounded-full',
            font: 'font-inter font-normal',
            size: {
                xs: 'text-xs',
                sm: 'text-sm',
                md: 'text-sm placeholder:font-light',
                lg: 'text-md',
                xl: 'text-lg',
            },
            padding: {
                md: 'py-3 px-5'
            },
        },
        formGroup: {
            label: {
                base: 'font-inter text-sm font-normal text-primary',
            }
        },
        card: {
            base: 'divide-y-0 bg-red-500',
            ring: 'border-none',
            rounded: 'rounded-2xl',
            header: {
                base: 'border-none',
                padding: 'px-9 sm:px-9 pt-9'
            },
            body: {
                base: 'px-9 sm:px-9 border-none',
                padding: 'sm:p-0 pt-0 py-0 sm:pb-6'
            }
        }
    }
})