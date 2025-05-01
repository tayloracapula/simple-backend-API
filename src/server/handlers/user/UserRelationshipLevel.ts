export enum UserRelationshipLevel {
    BASIC = "basic", // Just user data
    STANDARD = "standard", // User and role and department
    MANAGEMENT = "management", // Adds management relationships
    FULL = "full", // Everything including leave data
}
