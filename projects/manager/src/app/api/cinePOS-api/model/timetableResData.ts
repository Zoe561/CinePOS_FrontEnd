/**
 * CinePOS_BackEnd
 * CinePOS 後端API
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface TimetableResData { 
    /**
     * id
     */
    id: string;
    /**
     * 電影ID
     */
    movieId: string;
    /**
     * 廳院ID
     */
    theaterId: string;
    /**
     * 開始時間
     */
    startDate: string;
    /**
     * 結束時間
     */
    endDate: string;
    /**
     * 新增時間
     */
    createdAt: string;
    /**
     * 更新時間
     */
    updatedAt: string;
}