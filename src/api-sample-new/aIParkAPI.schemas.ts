/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * AIPark API
 * 기업연계 파이널 프로젝트 API 문서 백엔드 개발용
 * OpenAPI spec version: 1.0.0
 */
export type DownloadGeneratedAudio4Params = {
  bucketRoute: string;
};

export type DownloadGeneratedAudio3Params = {
  bucketRoute: string;
};

export type DownloadGeneratedAudio2Params = {
  bucketRoute: string;
};

export type DownloadGeneratedAudio1Params = {
  bucketRoute: string;
};

export type DownloadGeneratedAudioParams = {
  bucketRoute: string;
};

export type TestFailParams = {
  'Do Would you like to throw an exception?': string;
};

export type GetExportsParams = {
  keyword?: string;
};

export type GetProjects1Params = {
  keyword?: string;
};

export type GetExports2Params = {
  keyword?: string;
  pageable: Pageable;
};

export type GetProjectsParams = {
  keyword?: string;
  pageable: Pageable;
};

export type ConvertMultipleAudiosBody = {
  concatRequestDto: ConcatRequestDto;
  /** 업로드할 파일들 */
  files: Blob[];
};

export type UploadConcatBody = {
  file: Blob;
};

export type UploadConcatParams = {
  projectId: number;
};

export type UploadFiles1Body = {
  files: Blob[];
};

export type UploadFiles1Params = {
  memberId: number;
  projectId: number;
  audioType: string;
};

export type UploadFilesBody = {
  files: Blob[];
};

export type UploadFilesParams = {
  memberId: number;
  projectId: number;
  audioType: string;
};

export type UploadUnit1Body = {
  file: Blob;
};

export type UploadUnit1Params = {
  detailId: number;
  projectId: number;
};

export type UploadUnitBody = {
  file: Blob;
};

export type UploadUnitParams = {
  detailId: number;
  projectId: number;
};

export type ProcessVCProjectBody = {
  files: Blob[];
  VCSaveRequestDto: VCSaveRequestDto;
};

export type SaveVCProjectBody = {
  file?: Blob[];
  metadata: VCSaveDto;
};

export interface ProjectListDto {
  createdAt?: string;
  projectId?: number;
  projectName?: string;
  projectStatus?: string;
  projectType?: string;
  script?: string;
  updatedAt?: string;
}

export interface Pageable {
  /** @minimum 0 */
  page?: number;
  /** @minimum 1 */
  size?: number;
  sort?: string[];
}

export type DataResponseDtoData = { [key: string]: unknown };

export interface DataResponseDto {
  code?: number;
  data?: DataResponseDtoData;
  message?: string;
  success?: boolean;
}

export interface ConcatRequestDetailDto {
  audioSeq?: number;
  checked?: boolean;
  endSilence?: number;
  id?: number;
  sourceAudio?: Blob;
  unitScript?: string;
}

/**
 * 요청 DTO
 */
export interface ConcatRequestDto {
  concatRequestDetails?: ConcatRequestDetailDto[];
  globalFrontSilenceLength?: number;
  globalTotalSilenceLength?: number;
  projectId?: number;
  projectName?: string;
}

export interface DeleteReqDto {
  audioIds?: number[];
  detailIds?: number[];
  projectId?: number;
}

export interface ConcatDetailDto {
  audioSeq?: number;
  endSilence?: number;
  id?: number;
  isChecked?: boolean;
  localFileName?: string;
  unitScript?: string;
}

export interface ConcatSaveDto {
  concatDetails?: ConcatDetailDto[];
  globalFrontSilenceLength?: number;
  globalTotalSilenceLength?: number;
  projectId?: number;
  projectName?: string;
}

export type ConcatSaveBody = {
  concatSaveDto: ConcatSaveDto;
  file?: Blob[];
};

export interface MemberIdCheckRequestDto {
  email?: string;
}

export interface MemberIdFindRequestDto {
  name?: string;
  phoneNumber?: string;
}

export interface MemberPasswordFindRequestDto {
  email?: string;
  phoneNumber?: string;
}

export interface MemberInfoRequestDto {
  pwd?: string;
}

export interface MemberLoginRequestDto {
  email?: string;
  pwd?: string;
}

export interface MemberSignUpRequestDto {
  email?: string;
  name?: string;
  phoneNumber?: string;
  pwd?: string;
  pwdConfirm?: string;
  tou?: boolean;
}

export interface TTSRequestDetailDto {
  id?: number;
  isDeleted?: boolean;
  projectId?: number;
  unitPitch?: number;
  unitScript?: string;
  unitSequence?: number;
  unitSpeed?: number;
  unitVoiceStyleId?: number;
  unitVolume?: number;
}

export interface TTSRequestDto {
  fullScript?: string;
  globalPitch?: number;
  globalSpeed?: number;
  globalVoiceStyleId?: number;
  globalVolume?: number;
  projectId?: number;
  projectName?: string;
  ttsDetails?: TTSRequestDetailDto[];
}

export interface TTSSaveDetailDto {
  id?: number;
  isDeleted?: boolean;
  unitPitch?: number;
  unitScript?: string;
  unitSequence?: number;
  unitSpeed?: number;
  unitVoiceStyleId?: number;
  unitVolume?: number;
}

export interface TTSSaveDto {
  fullScript?: string;
  globalPitch?: number;
  globalSpeed?: number;
  globalVoiceStyleId?: number;
  globalVolume?: number;
  projectId?: number;
  projectName?: string;
  ttsDetails?: TTSSaveDetailDto[];
}

export interface TrgAudioFileRequestDto {
  localFileName?: string;
  s3MemberAudioMetaId?: number;
}

export type SrcAudioFileRequestDtoAudioType =
  (typeof SrcAudioFileRequestDtoAudioType)[keyof typeof SrcAudioFileRequestDtoAudioType];

export const SrcAudioFileRequestDtoAudioType = {
  VC_SRC: 'VC_SRC',
  VC_TRG: 'VC_TRG',
  CONCAT: 'CONCAT',
} as const;

export interface SrcAudioFileRequestDto {
  audioType?: SrcAudioFileRequestDtoAudioType;
  isChecked?: boolean;
  localFileName?: string;
  unitScript?: string;
}

export interface VCSaveRequestDto {
  projectId?: number;
  projectName?: string;
  srcFiles?: SrcAudioFileRequestDto[];
  trgFiles?: TrgAudioFileRequestDto[];
}

export interface TrgAudioFileDto {
  localFileName?: string;
  s3MemberAudioMetaId?: number;
}

export interface SrcAudioFileDto {
  detailId?: number;
  isChecked?: boolean;
  localFileName?: string;
  unitScript?: string;
}

export interface VCSaveDto {
  projectId?: number;
  projectName?: string;
  srcFiles?: SrcAudioFileDto[];
  trgFile?: TrgAudioFileDto;
}

export interface MemberUpdateRequestDto {
  name?: string;
  phoneNumber?: string;
}

export interface ResponseDto {
  code?: number;
  message?: string;
  success?: boolean;
}

export interface PasswordUpdateRequestDto {
  confirmPassword?: string;
  currentPassword?: string;
  newPassword?: string;
}
