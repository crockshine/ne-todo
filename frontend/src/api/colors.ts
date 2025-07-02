import { IColor } from "@/types/color.interface"

// Мемоизированная версия
let cachedPromise: Promise<IColor[]> | null = null

export const getAllColors = async (): Promise<IColor[]> => {
    if (cachedPromise) return cachedPromise

    cachedPromise = new Promise( (resolve) => {
        try {
            // Реальный запрос (раскомментируйте для использования)
            // const { data } = await axios.get<IColor[]>("/colors")
            // resolve(data)

            // Mock данные
            setTimeout(() => {
                resolve([
                    { id: "1", color: "#FF0000" },
                    { id: "2", color: "#00FF00" },
                    { id: "3", color: "#0000FF" }
                ])
            }, 1000)
        } catch (error) {
            console.error("Error fetching colors:", error)
            throw error
        }
    })

    return cachedPromise
}