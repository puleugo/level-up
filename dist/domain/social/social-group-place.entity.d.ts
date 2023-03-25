import { SocialGroupPlaceProperties } from '@domain/social/social-group';
import { SocialGroupPost } from '@domain/social/social-group.entity';
export declare class SocialGroupPlace implements SocialGroupPlaceProperties {
    id: string;
    socialGroup: SocialGroupPost;
    latitude: string;
    longitude: string;
    placeAddress: string;
    region1DepthName: string;
    region2DepthName: string;
    region3DepthName: string;
    buildingName: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
