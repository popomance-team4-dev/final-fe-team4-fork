export interface VoiceStyle {
  voice_style_id: bigint;
  is_visible: boolean;
  created_date: Date;
  last_modified_date: Date;
  country: string;
  created_by: string;
  gender: string;
  language_code: string;
  last_modified_by: string;
  personality: string;
  voice_name: string;
  voice_type: string;
}

export interface Member {
  member_id: bigint;
  is_deleted: boolean;
  gender: string;
  birth_date: Date;
  created_at: Date;
  created_date: Date;
  deleted_at: Date;
  last_modified_date: Date;
  updated_at: Date;
  created_by: string;
  email: string;
  last_modified_by: string;
  name: string;
  phone_number: string;
  pwd: string;
  tou: string;
}

export interface Project {
  project_id: bigint;
  is_deleted: boolean;
  created_at: Date;
  created_date: Date;
  deleted_at: Date;
  last_modified_date: Date;
  updated_at: Date;
  member_id: bigint;
  dtype: string;
  created_by: string;
  last_modified_by: string;
  project_name: string;
}

export interface TtsProject {
  project_id: bigint;
  global_pitch: number;
  global_speed: number;
  global_volume: number;
  api_status_modified_at: Date;
  voice_style_id: bigint;
  full_script: string;
  api_status:
    | 'CANCELLED'
    | 'FAILURE'
    | 'IN_PROGRESS'
    | 'NOT_STARTED'
    | 'PARTIAL_FAILURE'
    | 'SUCCESS';
}

export interface MultiJobLog {
  log_id: bigint;
  sequence: number;
  created_at: Date;
  created_date: Date;
  ended_at: Date;
  last_modified_date: Date;
  project_id: bigint;
  comment: string;
  created_by: string;
  fail_by: string;
  last_modified_by: string;
  project_name: string;
  multi_job_log_status_const: 'BLOCKED' | 'NEW' | 'RUNNABLE' | 'TERMINATED' | 'WAITING';
  project_type: 'CONCAT' | 'TTS' | 'VC';
}

export interface ConcatProject {
  project_id: bigint;
  global_front_silence_length: number;
  global_total_silence_length: number;
}

export interface TtsDetail {
  id: bigint;
  is_deleted: 0 | 1;
  unit_pitch: number;
  unit_sequence: number;
  unit_speed: number;
  unit_volume: number;
  created_at: Date;
  created_date: Date;
  deleted_at: Date;
  last_modified_date: Date;
  project_id: bigint;
  updated_at: Date;
  voice_style_id: bigint;
}

export interface OutputAudioMeta {
  generated_audio_meta_id: bigint;
  is_deleted: 0 | 1;
  concat_project_id: bigint;
  created_at: Date;
  created_date: Date;
  deleted_at: Date;
  last_modified_date: Date;
  tts_detail_id: bigint;
  vc_detail_id: bigint;
  audio_url: string;
  bucket_route: string;
  created_by: string;
  last_modified_by: string;
  audio_format: 'MP3' | 'WAV';
  project_type: 'CONCAT' | 'TTS' | 'VC';
}

export interface ConcatUserAudio {
  history_id: bigint;
  user_audio_list: string[];
}

export interface ConcatStatusHistory {
  history_id: bigint;
  created_at: Date;
  created_date: Date;
  last_modified_date: Date;
  project_id: bigint;
  created_by: string;
  last_modified_by: string;
  concat_status_const: 'FAILURE' | 'SUCCESS';
}

export interface ApiStatus {
  request_id: bigint;
  response_code: string;
  created_date: Date;
  last_modified_date: Date;
  request_at: Date;
  response_at: Date;
  tts_detail_id: bigint;
  vc_detail_id: bigint;
  created_by: string;
  last_modified_by: string;
  request_payload: string;
  response_payload: string;
  api_unit_status_const: 'FAILURE' | 'SUCCESS';
}

export interface ConcatDetail {
  concat_detail_id: bigint;
  audio_seq: number;
  end_silence: number;
  is_checked: 0 | 1;
  is_deleted: 0 | 1;
  created_at: Date;
  created_date: Date;
  deleted_at: Date;
  last_modified_date: Date;
  member_audio_id: bigint;
  project_id: bigint;
  updated_at: Date;
  created_by: string;
  last_modified_by: string;
  unit_script: string;
}

export interface MemberAudioConcat {
  member_audio_concat_id: bigint;
  created_date: Date;
  last_modified_date: Date;
  member_audio_id: bigint;
  project_id: bigint;
  created_by: string;
  last_modified_by: string;
}

export interface VcProject {
  project_id: bigint;
  api_status:
    | 'CANCELLED'
    | 'FAILURE'
    | 'IN_PROGRESS'
    | 'NOT_STARTED'
    | 'PARTIAL_FAILURE'
    | 'SUCCESS';
  api_status_modified_at: Date;
  member_audio_id: bigint;
  trg_voice_id: string;
}

export interface MemberAudioMeta {
  member_audio_id: bigint;
  is_deleted: 0 | 1;
  created_at: Date;
  created_date: Date;
  deleted_at: Date;
  last_modified_date: Date;
  member_id: bigint;
  trg_voice_id: string;
  bucket_route: string;
  created_by: string;
  last_modified_by: string;
  audio_format: 'MP3' | 'WAV';
  audio_type: 'CONCAT' | 'VC_SRC' | 'VC_TRG';
  audio_url: string;
}

export interface Style {
  style_id: bigint;
  created_by: string;
  created_date: Date;
  last_modified_by: string;
  last_modified_date: Date;
  gender: string;
  is_visible: 0 | 1;
  language: string;
  voice_name: string;
  voice_type: string;
}

export interface VcDetail {
  vc_detail_id: bigint;
  is_checked: 0 | 1;
  is_deleted: 0 | 1;
  created_at: Date;
  created_date: Date;
  deleted_at: Date;
  last_modified_date: Date;
  member_audio_id: bigint;
  project_id: bigint;
  updated_at: Date;
  created_by: string;
  last_modified_by: string;
  unit_script: string;
}

export interface MemberAudioVc {
  member_audio_vc_id: bigint;
  created_date: Date;
  last_modified_date: Date;
  member_audio_id: bigint;
  project_id: bigint;
  created_by: string;
  last_modified_by: string;
}

export interface MemberAudioVcId {
  member_audio_vc_id: bigint;
  created_date: Date;
  last_modified_date: Date;
  member_audio_id: bigint;
  project_id: bigint;
  created_by: string;
  last_modified_by: string;
}
