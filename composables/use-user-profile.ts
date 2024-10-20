export default async function () {
    const supabase = useSupabaseClient()

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single()

    if (error) {
        throw error
    }

    return profile
}