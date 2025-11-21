
export async function api<T>(url:string): Promise<T> 
{
    const res = await fetch(url)
    if(!res.ok) throw new Error("API ERROR");
    return res.json() as Promise<T>

}