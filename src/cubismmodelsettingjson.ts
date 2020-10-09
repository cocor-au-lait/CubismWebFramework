/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { Live2DCubismFramework as cubismframework } from './live2dcubismframework';
import { Live2DCubismFramework as icubismmodelsetting } from './icubismmodelsetting';
import { Live2DCubismFramework as cubismid } from './id/cubismid';
import { Live2DCubismFramework as csmmap } from './type/csmmap';
import csmMap = csmmap.csmMap;
import iterator = csmmap.iterator;
import CubismFramework = cubismframework.CubismFramework;
import CubismIdHandle = cubismid.CubismIdHandle;
import ICubismModelSetting = icubismmodelsetting.ICubismModelSetting;
import { Model3 } from './@types/model3';

export namespace Live2DCubismFramework {
  // enum FrequestNode {
  //   FrequestNode_Groups, // getRoot().getValueByString(Groups)
  //   FrequestNode_Moc, // getRoot().getValueByString(FileReferences).getValueByString(Moc)
  //   FrequestNode_Motions, // getRoot().getValueByString(FileReferences).getValueByString(Motions)
  //   FrequestNode_Expressions, // getRoot().getValueByString(FileReferences).getValueByString(Expressions)
  //   FrequestNode_Textures, // getRoot().getValueByString(FileReferences).getValueByString(Textures)
  //   FrequestNode_Physics, // getRoot().getValueByString(FileReferences).getValueByString(Physics)
  //   FrequestNode_Pose, // getRoot().getValueByString(FileReferences).getValueByString(Pose)
  //   FrequestNode_HitAreas // getRoot().getValueByString(HitAreas)
  // }

  /**
   * Model3Jsonパーサー
   *
   * model3.jsonファイルをパースして値を取得する
   */
  export class CubismModelSettingJson extends ICubismModelSetting {
    /**
     * コンストラクタ
     * @param context Text context or file buffer of motion3.json.
     */
    public constructor(context: string | ArrayBuffer, _?: number) {
      super();
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
     * CubismJsonオブジェクトを取得する
     *
     * @return CubismJson
     */
    public GetJson(): Model3 {
      return this._json;
    }

    /**
     * Mocファイルの名前を取得する
     * @return Mocファイルの名前
     */
    public getModelFileName(): string {
      return this._json.FileReferences.Moc
    }

    /**
     * モデルが使用するテクスチャの数を取得する
     * テクスチャの数
     */
    public getTextureCount(): number {
      return this._json.FileReferences.Textures.length
    }

    /**
     * テクスチャが配置されたディレクトリの名前を取得する
     * @return テクスチャが配置されたディレクトリの名前
     */
    public getTextureDirectory(): string {
      throw Error('This function is not implemented.')
    }

    /**
     * モデルが使用するテクスチャの名前を取得する
     * @param index 配列のインデックス値
     * @return テクスチャの名前
     */
    public getTextureFileName(index: number): string {
      return this._json.FileReferences.Textures[index]
    }

    /**
     * モデルに設定された当たり判定の数を取得する
     * @return モデルに設定された当たり判定の数
     */
    public getHitAreasCount(): number {
      if (!this._json.HitAreas) {
        return 0
      }
      return this._json.HitAreas.length
    }

    /**
     * 当たり判定に設定されたIDを取得する
     *
     * @param index 配列のindex
     * @return 当たり判定に設定されたID
     */
    public getHitAreaId(index: number): CubismIdHandle | null {
      if (!this._json.HitAreas) {
        return null
      }
      return CubismFramework.getIdManager().getId(
        this._json.HitAreas[index].Id
      );
    }

    /**
     * 当たり判定に設定された名前を取得する
     * @param index 配列のインデックス値
     * @return 当たり判定に設定された名前
     */
    public getHitAreaName(index: number): string | null {
      if (!this._json.HitAreas) {
        return null
      }
      return this._json.HitAreas[index].Name
    }

    /**
     * 物理演算設定ファイルの名前を取得する
     * @return 物理演算設定ファイルの名前
     */
    public getPhysicsFileName(): string | null {
      return this._json.FileReferences.Physics
    }

    /**
     * パーツ切り替え設定ファイルの名前を取得する
     * @return パーツ切り替え設定ファイルの名前
     */
    public getPoseFileName(): string | null {
      return this._json.FileReferences.Pose
    }

    /**
     * 表情設定ファイルの数を取得する
     * @return 表情設定ファイルの数
     */
    public getExpressionCount(): number {
      if (!this._json.FileReferences.Expressions) {
        return 0;
      }
      return this._json.FileReferences.Expressions.length
    }

    /**
     * 表情設定ファイルを識別する名前（別名）を取得する
     * @param index 配列のインデックス値
     * @return 表情の名前
     */
    public getExpressionName(index: number): string | null {
      if (!this._json.FileReferences.Expressions) {
        return null;
      }
      return this._json.FileReferences.Expressions[index].Name
    }

    /**
     * 表情設定ファイルの名前を取得する
     * @param index 配列のインデックス値
     * @return 表情設定ファイルの名前
     */
    public getExpressionFileName(index: number): string {
      if (!this._json.FileReferences.Expressions) {
        return null;
      }
      return this._json.FileReferences.Expressions[index].File
    }

    /**
     * モーショングループの数を取得する
     * @return モーショングループの数
     */
    public getMotionGroupCount(): number {
      if (!this._json.FileReferences.Motions) {
        return 0;
      }
      return Object.keys(this._json.FileReferences.Motions).length
    }

    /**
     * モーショングループの名前を取得する
     * @param index 配列のインデックス値
     * @return モーショングループの名前
     */
    public getMotionGroupName(index: number): string | null {
      if (!this._json.FileReferences.Motions) {
        return null;
      }
      return Object.keys(this._json.FileReferences.Motions)[index]
    }

    /**
     * モーショングループに含まれるモーションの数を取得する
     * @param groupName モーショングループの名前
     * @return モーショングループの数
     */
    public getMotionCount(groupName: string): number {
      if (!this._json.FileReferences.Motions) {
        return 0;
      }
      if (!this._json.FileReferences.Motions[groupName]) {
        return 0;
      }
      return this._json.FileReferences.Motions[groupName].length
    }

    /**
     * グループ名とインデックス値からモーションファイル名を取得する
     * @param groupName モーショングループの名前
     * @param index     配列のインデックス値
     * @return モーションファイルの名前
     */
    public getMotionFileName(groupName: string, index: number): string | null {
      if (!this._json.FileReferences.Motions) {
        return null;
      }
      if (!this._json.FileReferences.Motions[groupName]) {
        return null;
      }
      return this._json.FileReferences.Motions[groupName][index].File
    }

    /**
     * モーションに対応するサウンドファイルの名前を取得する
     * @param groupName モーショングループの名前
     * @param index 配列のインデックス値
     * @return サウンドファイルの名前
     */
    public getMotionSoundFileName(groupName: string, index: number): string | null {
      if (!this._json.FileReferences.Motions) {
        return null;
      }
      return this._json.FileReferences.Motions[groupName][index].Sound
    }

    /**
     * モーション開始時のフェードイン処理時間を取得する
     * @param groupName モーショングループの名前
     * @param index 配列のインデックス値
     * @return フェードイン処理時間[秒]
     */
    public getMotionFadeInTimeValue(groupName: string, index: number): number {
      if (!this._json.FileReferences.Motions) {
        return -1;
      }
      if (!this._json.FileReferences.Motions[groupName][index].FadeInTime) {
        return -1;
      }
      return this._json.FileReferences.Motions[groupName][index].FadeInTime
    }

    /**
     * モーション終了時のフェードアウト処理時間を取得する
     * @param groupName モーショングループの名前
     * @param index 配列のインデックス値
     * @return フェードアウト処理時間[秒]
     */
    public getMotionFadeOutTimeValue(groupName: string, index: number): number {
      if (!this._json.FileReferences.Motions) {
        return -1;
      }
      if (!this._json.FileReferences.Motions[groupName][index].FadeOutTime) {
        return -1;
      }
      return this._json.FileReferences.Motions[groupName][index].FadeOutTime
    }

    /**
     * ユーザーデータのファイル名を取得する
     * @return ユーザーデータのファイル名
     */
    public getUserDataFile(): string {
      if (!this._json.FileReferences.UserData) {
        return '';
      }
      return this._json.FileReferences.UserData
    }

    /**
     * レイアウト情報を取得する
     * @param outLayoutMap csmMapクラスのインスタンス
     * @return true レイアウト情報が存在する
     * @return false レイアウト情報が存在しない
     */
    public getLayoutMap(outLayoutMap: csmMap<string, number>): boolean {
      // 存在しない要素にアクセスするとエラーになるためValueがnullの場合はnullを代入する
      const layout = this._json.Layout
      if (!layout) {
        return false;
      }
      Object.keys(layout).forEach(key => {
        outLayoutMap.setValue(key, layout[key])
      });
      return true;
    }

    /**
     * 目パチに関連付けられたパラメータの数を取得する
     * @return 目パチに関連付けられたパラメータの数
     */
    public getEyeBlinkParameterCount(): number {
      const eyeBlinkGroup = this._json.Groups?.filter(group => group.Name === 'EyeBlink')[0]
      if (!eyeBlinkGroup) {
        return 0;
      }
      return eyeBlinkGroup.Ids.length
    }

    /**
     * 目パチに関連付けられたパラメータのIDを取得する
     * @param index 配列のインデックス値
     * @return パラメータID
     */
    public getEyeBlinkParameterId(index: number): CubismIdHandle {
      const eyeBlinkGroup = this._json.Groups?.filter(group => group.Name === 'EyeBlink')[0]
      if (!eyeBlinkGroup) {
        return null;
      }
      return CubismFramework.getIdManager().getId(eyeBlinkGroup.Ids[index])
    }

    /**
     * リップシンクに関連付けられたパラメータの数を取得する
     * @return リップシンクに関連付けられたパラメータの数
     */
    public getLipSyncParameterCount(): number {
      const lipSyncGroup = this._json.Groups?.filter(group => group.Name === 'LipSync')[0]
      if (!lipSyncGroup) {
        return 0;
      }
      return lipSyncGroup.Ids.length
    }

    /**
     * リップシンクに関連付けられたパラメータの数を取得する
     * @param index 配列のインデックス値
     * @return パラメータID
     */
    public getLipSyncParameterId(index: number): CubismIdHandle {
      const lipSyncGroup = this._json.Groups?.filter(group => group.Name === 'LipSync')[0]
      if (!lipSyncGroup) {
        return null;
      }
      return CubismFramework.getIdManager().getId(lipSyncGroup.Ids[index])
    }

    private _json: Model3;
  }
}
