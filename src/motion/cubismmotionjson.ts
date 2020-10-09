/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { Live2DCubismFramework as cubismid } from '../id/cubismid';
import { Live2DCubismFramework as cubismframework } from '../live2dcubismframework';
import { Live2DCubismFramework as csmstring } from '../type/csmstring';
import csmString = csmstring.csmString;
import CubismFramework = cubismframework.CubismFramework;
import CubismIdHandle = cubismid.CubismIdHandle;
import { Motion3 } from '../@types/motion3';

export namespace Live2DCubismFramework {
  /**
   * motion3.jsonのコンテナ。
   */
  export class CubismMotionJson {
    /**
     * コンストラクタ
     * @param context Text context or file buffer of motion3.json.
     */
    public constructor(context: string | ArrayBuffer, _?: number) {
      if (context instanceof ArrayBuffer) {
        this._json = JSON.parse(
          String.fromCharCode.apply(null, new Uint8Array(context))
        )
      } else {
        this._json = JSON.parse(context)
      }
    }

    /**
     * デストラクタ相当の処理
     */
    public release(): void {
      // Nothing to do.
    }

    /**
     * モーションの長さを取得する
     * @return モーションの長さ[秒]
     */
    public getMotionDuration(): number {
      return this._json.Meta.Duration
    }

    /**
     * モーションのループ情報の取得
     * @return true ループする
     * @return false ループしない
     */
    public isMotionLoop(): boolean {
      if (this._json.Meta.Loop == null) {
        return false
      }
      return this._json.Meta.Loop
    }

    /**
     * モーションカーブの個数の取得
     * @return モーションカーブの個数
     */
    public getMotionCurveCount(): number {
      return this._json.Meta.CurveCount
    }

    /**
     * モーションのフレームレートの取得
     * @return フレームレート[FPS]
     */
    public getMotionFps(): number {
      return this._json.Meta.Fps
    }

    /**
     * モーションのセグメントの総合計の取得
     * @return モーションのセグメントの取得
     */
    public getMotionTotalSegmentCount(): number {
      return this._json.Meta.TotalSegmentCount
    }

    /**
     * モーションのカーブの制御店の総合計の取得
     * @return モーションのカーブの制御点の総合計
     */
    public getMotionTotalPointCount(): number {
      return this._json.Meta.TotalPointCount
    }

    /**
     * モーションのフェードイン時間の存在
     * @return true 存在する
     * @return false 存在しない
     */
    public isExistMotionFadeInTime(): boolean {
      return this._json.Meta.FadeInTime != null
    }

    /**
     * モーションのフェードアウト時間の存在
     * @return true 存在する
     * @return false 存在しない
     */
    public isExistMotionFadeOutTime(): boolean {
      return this._json.Meta.FadeOutTime != null
    }

    /**
     * モーションのフェードイン時間の取得
     * @return フェードイン時間[秒]
     */
    public getMotionFadeInTime(): number {
      if (this._json.Meta.FadeInTime == null) {
        return 0
      }
      return this._json.Meta.FadeInTime
    }

    /**
     * モーションのフェードアウト時間の取得
     * @return フェードアウト時間[秒]
     */
    public getMotionFadeOutTime(): number {
      if (this._json.Meta.FadeOutTime == null) {
        return 0
      }
      return this._json.Meta.FadeOutTime
    }

    /**
     * モーションのカーブの種類の取得
     * @param curveIndex カーブのインデックス
     * @return カーブの種類
     */
    public getMotionCurveTarget(curveIndex: number): string {
      return this._json.Curves[curveIndex].Target
    }

    /**
     * モーションのカーブのIDの取得
     * @param curveIndex カーブのインデックス
     * @return カーブのID
     */
    public getMotionCurveId(curveIndex: number): CubismIdHandle {
      return CubismFramework.getIdManager().getId(
        this._json.Curves[curveIndex].Id
      );
    }

    /**
     * モーションのカーブのフェードイン時間の存在
     * @param curveIndex カーブのインデックス
     * @return true 存在する
     * @return false 存在しない
     */
    public isExistMotionCurveFadeInTime(curveIndex: number): boolean {
      return this._json.Curves[curveIndex].FadeInTime != null
    }

    /**
     * モーションのカーブのフェードアウト時間の存在
     * @param curveIndex カーブのインデックス
     * @return true 存在する
     * @return false 存在しない
     */
    public isExistMotionCurveFadeOutTime(curveIndex: number): boolean {
      return this._json.Curves[curveIndex].FadeOutTime != null
    }

    /**
     * モーションのカーブのフェードイン時間の取得
     * @param curveIndex カーブのインデックス
     * @return フェードイン時間[秒]
     */
    public getMotionCurveFadeInTime(curveIndex: number): number {
      if (this._json.Curves[curveIndex].FadeInTime == null) {
        return 0
      }
      return this._json.Curves[curveIndex].FadeInTime
    }

    /**
     * モーションのカーブのフェードアウト時間の取得
     * @param curveIndex カーブのインデックス
     * @return フェードアウト時間[秒]
     */
    public getMotionCurveFadeOutTime(curveIndex: number): number {
      if (this._json.Curves[curveIndex].FadeOutTime == null) {
        return 0
      }
      return this._json.Curves[curveIndex].FadeOutTime
    }

    /**
     * モーションのカーブのセグメントの個数を取得する
     * @param curveIndex カーブのインデックス
     * @return モーションのカーブのセグメントの個数
     */
    public getMotionCurveSegmentCount(curveIndex: number): number {
      return this._json.Curves[curveIndex].Segments.length
    }

    /**
     * モーションのカーブのセグメントの値の取得
     * @param curveIndex カーブのインデックス
     * @param segmentIndex セグメントのインデックス
     * @return セグメントの値
     */
    public getMotionCurveSegment(
      curveIndex: number,
      segmentIndex: number
    ): number {
      return this._json.Curves[curveIndex].Segments[segmentIndex]
    }

    /**
     * イベントの個数の取得
     * @return イベントの個数
     */
    public getEventCount(): number {
      if (this._json.Meta.UserDataCount == null) {
        return 0
      }
      return this._json.Meta.UserDataCount
    }

    /**
     *  イベントの総文字数の取得
     * @return イベントの総文字数
     */
    public getTotalEventValueSize(): number {
      if (this._json.Meta.TotalUserDataSize == null) {
        return 0
      }
      return this._json.Meta.TotalUserDataSize
    }

    /**
     * イベントの時間の取得
     * @param userDataIndex イベントのインデックス
     * @return イベントの時間[秒]
     */
    public getEventTime(userDataIndex: number): number {
      if (this._json.UserData == null) {
        return 0
      }
      return this._json.UserData[userDataIndex].Time
    }

    /**
     * イベントの取得
     * @param userDataIndex イベントのインデックス
     * @return イベントの文字列
     */
    public getEventValue(userDataIndex: number): csmString | null {
      if (this._json.UserData == null) {
        return null
      }
      return new csmString(
        this._json.UserData[userDataIndex].Value
      );
    }

    _json: Motion3;
  }
}
