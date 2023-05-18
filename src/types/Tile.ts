export enum Tile {
    Empty,
    Character_start,
    Character_end,
    Barrel_start,
    Barrel_end,

    // Everything below this limit (50 or lower) is a non blocking Tile
    Limit = 50,

    Character = 100,
    Barrel,
}
