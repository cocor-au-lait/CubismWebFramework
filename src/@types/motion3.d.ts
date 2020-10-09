/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Cubism motion3.json File Format
 */
export interface Motion3 {
  /**
   * Json file format version.
   */
  Version: number;
  /**
   * Additional data describing the motion.
   */
  Meta: {
    /**
     * Duration of the motion in seconds.
     */
    Duration: number;
    /**
     * Framerate of the motion in seconds.
     */
    Fps: number;
    /**
     * [Optional] Status of the looping of the motion.
     */
    Loop?: boolean;
    /**
     * [Optional] Status of the restriction of Bezier handles'X translations.
     */
    AreBeziersRestricted?: boolean;
    /**
     * [Optional] Time of the overall Fade-In for easing in seconds.
     */
    FadeInTime?: number;
    /**
     * [Optional] Time of the overall Fade-Out for easing in seconds.
     */
    FadeOutTime?: number;
    /**
     * The total number of curves.
     */
    CurveCount: number;
    /**
     * The total number of segments (from all curves).
     */
    TotalSegmentCount: number;
    /**
     * The total number of points (from all segments of all curves).
     */
    TotalPointCount: number;
    /**
     * [Optional] The total number of UserData.
     */
    UserDataCount?: number;
    /**
     * [Optional] The total size of UserData in bytes.
     */
    TotalUserDataSize?: number;
  };
  /**
   * Motion curves.
   */
  Curves: Curve[];
  /**
   * [Optional] User data.
   */
  UserData?: UserData[];
}
/**
 * Single curve.
 */
export interface Curve {
  /**
   * Target type.
   */
  Target: string;
  /**
   * Identifier for mapping curve to target.
   */
  Id: string;
  /**
   * [Optional] Time of the Fade-In for easing in seconds.
   */
  FadeInTime?: number;
  /**
   * [Optional] Time of the Fade-Out for easing in seconds.
   */
  FadeOutTime?: number;
  /**
   * Flattened segments.
   */
  Segments: number[];
}
/**
 * User data.
 */
export interface UserData {
  /**
   * Time in seconds.
   */
  Time: number;
  /**
   * Content of user data.
   */
  Value: string;
}
