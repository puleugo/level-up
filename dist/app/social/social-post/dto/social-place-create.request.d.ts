import { SocialPlaceCreateRequestCommand } from '@app/social/social-post/commands/social.commands';
export declare class SocialPlaceCreateRequest implements SocialPlaceCreateRequestCommand {
    buildingName: string | null;
    latitude: string;
    longitude: string;
    placeAddress: string;
    region1DepthName: string;
    region2DepthName: string;
    region3DepthName: string;
}
