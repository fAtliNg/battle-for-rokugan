
export enum EAreaType {
    Region = 'region',
    Province = 'province'
}

export enum EAreaEffects {
    PeaceArea = 'peaceArea',
    ScorchedArea = 'cscorchedArea',
    HolyArea = 'holyArea',
    HarborArea = 'harborArea',
    GloryArea = 'gloryArea'
}

export enum ETokenType {
    Army = 'army',
    Fleet = 'fleet',
    Ninja = 'ninja',
    Blessing = 'blessing',
    Diplomacy = 'diplomacy',
    Breakup = 'breakup',
    Empty = 'empty'
}


export interface IToken {
    tokenOwner: string
    color: string
    forcePoints: number
    tokenType: ETokenType
    blessing?: number[]
}

export interface ICapital {
    fill: string
    d: string
}

export interface IProvince {
    type: EAreaType.Province
    id: string
    d: string
    fill: string
    coastalArea: boolean
    capital?: ICapital[]
    defense: IToken[]
    underAttack: IToken[]
    attack: IToken[]
    effects: EAreaEffects[]
    landlord: string | null
    defensePoints?: number

}

export interface IRegion {
    type: EAreaType.Region
    id: string
    provinces: IProvince[]
}

export interface IBorderSettings {
    stroke: string
    strokeWidth: number
}

export interface IGameMap {
    data: IRegion[]
    borderSettings?: IBorderSettings
    onProvinceClick: (province: IProvince) => void
}