export let refreshTokens:string[] = []

export const upDateTokens=(tokens:string[])=>{
    refreshTokens = tokens;
}

