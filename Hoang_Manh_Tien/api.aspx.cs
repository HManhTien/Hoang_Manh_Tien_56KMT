﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using SuatAn;
using static System.Collections.Specialized.BitVector32;

namespace Hoang_Manh_Tien
{
    public partial class api : System.Web.UI.Page
    {
        void xuly_nguoidung(string action)
        {
            //khai báo biến db thuộc lớp SqlServer
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_USER", action); //tạo cm với "SP_Company" và @action từ method GetCmd của db
            switch (action)
            {
                case "US_login_ck":
                    cm.Parameters.Add("@id", SqlDbType.NVarChar, 50).Value = Request["id"];
                    cm.Parameters.Add("@cookie", SqlDbType.NVarChar, 50).Value = Request["ck"];
                    break;
                //2 loại này truyền 5 tham số chung
                case "US_login":   
                    cm.Parameters.Add("@User_Name", SqlDbType.NVarChar, 50).Value = Request["User_Name"];
                    cm.Parameters.Add("@pw", SqlDbType.NVarChar, 50).Value = Request["pw"];
                    break;

                case "US_LIST":
                    break;  

                case "US_Xoa":
                    cm.Parameters.Add("@id", SqlDbType.NVarChar, 50).Value = Request["id"];
                    break;
                case "US_add":
                    cm.Parameters.Add("@User_Name", SqlDbType.NVarChar, 50).Value = Request["User_Name"];
                    cm.Parameters.Add("@hodem", SqlDbType.NVarChar, 50).Value = Request["hodem"];
                    cm.Parameters.Add("@ten", SqlDbType.NVarChar, 50).Value = Request["ten"];
                    cm.Parameters.Add("@pw", SqlDbType.NVarChar, 50).Value = Request["pw"];
                    cm.Parameters.Add("@diachi", SqlDbType.NVarChar, 50).Value = Request["diachi"];
                    cm.Parameters.Add("@sdt", SqlDbType.Int).Value = Request["SDT"];
                    break;

                case "US_edit":
                    cm.Parameters.Add("@id", SqlDbType.Int).Value = Request["id"];
                    cm.Parameters.Add("@User_Name", SqlDbType.NVarChar, 50).Value = Request["User_Name"];
                    cm.Parameters.Add("@hodem", SqlDbType.NVarChar, 50).Value = Request["hodem"];
                    cm.Parameters.Add("@ten", SqlDbType.NVarChar, 50).Value = Request["ten"];
                    cm.Parameters.Add("@diachi", SqlDbType.NVarChar, 50).Value = Request["diachi"];
                    cm.Parameters.Add("@sdt", SqlDbType.Int).Value = Request["SDT"];
                    break;
                case "US_DOIPW":
                    cm.Parameters.Add("@id", SqlDbType.Int).Value = Request["id"];
                    cm.Parameters.Add("@pw", SqlDbType.NVarChar, 50).Value = Request["pw"];
                    cm.Parameters.Add("@newpw", SqlDbType.NVarChar, 50).Value = Request["new_pw"];
                    break;
            }
            string json = (string)db.Scalar(cm); //thuc thi SqlCommand cm này để thu về json
            Response.Write(json); //trả json về trình duyệt
        }


        void xuly_cuahang(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_Cuahang", action); //tạo cm với "SP_Company" và @action từ method GetCmd của db
            switch (action)
            {
                case "CH_list_banh":
                    break;
                case "CH_list_nguyen_lieu":
                    break;
                case "CH_sua_gia_nguyen_lieu":
                    cm.Parameters.Add("@mnv", SqlDbType.NVarChar, 50).Value = Request["manv"];
                    cm.Parameters.Add("@giaban", SqlDbType.Int).Value = Request["gianv"];
                    break;
                  

                case "CH_list_hoa_don":
                    break;

                case "CH_list_hoa_don_hoan_thanh":
                    break;
                case "CH_chi_tiet_hoa_don":
                    cm.Parameters.Add("@mahoadon", SqlDbType.NVarChar, 50).Value = Request["mahoadon"];
                    break;

                case "CH_add_hoa_don":
                    cm.Parameters.Add("@mahoadon", SqlDbType.NVarChar, 50).Value = Request["mahoadon"];
                    cm.Parameters.Add("@tennguoinhan", SqlDbType.NVarChar, 50).Value = Request["Tennguoinhan"];
                    cm.Parameters.Add("@diachinhan", SqlDbType.NVarChar, 50).Value = Request["diachinguoinhan"];
                    cm.Parameters.Add("@makhachhang", SqlDbType.NVarChar, 50).Value = Request["MaKH"];
                    cm.Parameters.Add("@trangthai", SqlDbType.NVarChar, 50).Value = Request["Trangthai"];
                    cm.Parameters.Add("@tongtien", SqlDbType.Int).Value = Request["tongtien"];
                    break;
                case "CH_add_ct_hoa_don":
                    cm.Parameters.Add("@mahoadon", SqlDbType.NVarChar, 50).Value = Request["mahoadon"];
                    cm.Parameters.Add("@mabanh", SqlDbType.NVarChar, 50).Value = Request["mabanh"];
                    cm.Parameters.Add("@soluong", SqlDbType.Int).Value = Request["soluong"];
                    cm.Parameters.Add("@giaban", SqlDbType.Int).Value = Request["giaban"];
                    break;
                case "CH_doanh_thu":
                    break;
                case "CH_xac_nhan_hoa_don":
                    break;
                case "CH_update_xac_nhan_don_hang":
                    cm.Parameters.Add("@mahoadon", SqlDbType.NVarChar, 50).Value = Request["mahoadon"];
                    break;
                case "CH_tim_kiem_banh":
                    cm.Parameters.Add("@tenbanh", SqlDbType.NVarChar, 50).Value = Request["tenbanh"];
                    break;

            }
            string json = (string)db.Scalar(cm); //thuc thi SqlCommand cm này để thu về json
            Response.Write(json); //trả json về trình duyệt
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            switch (action)
            {   
                case "US_LIST":
                case "US_login":
                case "US_Xoa":
                case "US_add":
                case "US_edit":
                case "US_login_ck":
                case "US_DOIPW":
                    xuly_nguoidung(action);
                    break;
                case "CH_list_banh":
                case "CH_list_hoa_don":
                case "CH_list_hoa_don_hoan_thanh":
                case "CH_chi_tiet_hoa_don":
                case "CH_add_hoa_don":
                case "CH_add_ct_hoa_don":
                case "CH_doanh_thu":
                case "CH_xac_nhan_hoa_don":
                case "CH_update_xac_nhan_don_hang":
                case "CH_tim_kiem_banh":
                case "CH_list_nguyen_lieu":
                case "CH_sua_gia_nguyen_lieu":
                    xuly_cuahang(action);
                    break;
            }
        }
    }
}