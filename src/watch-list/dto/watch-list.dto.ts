import { IsNotEmpty, IsString, Validate } from "@nestjs/class-validator";
import { IsValid } from "../../../core/validators/custom-validators";

export class WatchLaterDTO {
  @IsNotEmpty()
  @IsString()
  @Validate(IsValid)
  video_id: string;
}
