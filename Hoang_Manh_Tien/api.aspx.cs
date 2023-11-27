using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using SuatAn;
using static System.Collections.Specialized.BitVector32;
using System.Security.Cryptography;

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
                case "CH_LIST_BANH":
                    break;
                case "CH_LIST_NGUYEN_LIEU":
                    break;
                case "CH_SUA_GIA_NGUYEN_LIEU":
                    cm.Parameters.Add("@MNV", SqlDbType.NVarChar, 50).Value = Request["manv"];
                    cm.Parameters.Add("@GIABAN", SqlDbType.Int).Value = Request["gianv"];
                    break;


                case "CH_LIST_HOA_DON_HOAN_THANH":
                    break;
                case "CH_CHI_TIET_HOA_DON":
                    cm.Parameters.Add("@MAHOADON", SqlDbType.NVarChar, 50).Value = Request["mahoadon"];
                    break;
                case "CH_CHI_TIET_HOA_DON_HOAN_THANH":
                    cm.Parameters.Add("@MAHOADON", SqlDbType.NVarChar, 50).Value = Request["mahoadon"];
                    break;
                case "CH_DA_NHAN_DUOC_HANG":
                    cm.Parameters.Add("@MAHOADON", SqlDbType.NVarChar, 50).Value = Request["mahoadon"];
                    break;


                case "CH_ADD_KHACH_HANG":                  
                    cm.Parameters.Add("@MAKHACHHANG", SqlDbType.NVarChar, 50).Value = Request["MaKH"];
                    cm.Parameters.Add("@TENNGUOINHAN", SqlDbType.NVarChar, 50).Value = Request["ten"];
                    cm.Parameters.Add("@DIACHINHAN", SqlDbType.NVarChar, 50).Value = Request["diachi"];
                    cm.Parameters.Add("@SDT_NHAN", SqlDbType.NVarChar, 50).Value = Request["sdt"];


                    break;
                case "CH_ADD_HOA_DON":
                    cm.Parameters.Add("@MAHOADON", SqlDbType.NVarChar, 50).Value = Request["mahoadon"];
                    cm.Parameters.Add("@MAKHACHHANG", SqlDbType.NVarChar, 50).Value = Request["MaKH"];
                    cm.Parameters.Add("@TRANGTHAI", SqlDbType.NVarChar, 50).Value = Request["Trangthai"];
                    cm.Parameters.Add("@TONGTIEN", SqlDbType.Int).Value = Request["tongtien"];
                    break;
                case "CH_ADD_CT_HOA_DON":
                    cm.Parameters.Add("@MAHOADON", SqlDbType.NVarChar, 50).Value = Request["mahoadon"];
                    cm.Parameters.Add("@MABANH", SqlDbType.NVarChar, 50).Value = Request["mabanh"];
                    cm.Parameters.Add("@SOLUONG", SqlDbType.Int).Value = Request["soluong"];
                    cm.Parameters.Add("@GIABAN", SqlDbType.Int).Value = Request["giaban"];
                    break;
                case "CH_DOANH_THU":
                    cm.Parameters.Add("@THANG", SqlDbType.NVarChar, 50).Value = Request["thang"];
                    break;
                case "CH_XAC_NHAN_HOA_DON":
                    break;
                case "CH_DON_HANG_DANG_GIAO":
                    break;
                case "CH_UPDATE_XAC_NHAN_DON_HANG":
                    cm.Parameters.Add("@MAHOADON", SqlDbType.NVarChar, 50).Value = Request["mahoadon"];
                    cm.Parameters.Add("@MASHIPER", SqlDbType.NVarChar, 50).Value = Request["mashiper"];
                    cm.Parameters.Add("@THOI_GIAN_SHIP", SqlDbType.NVarChar, 50).Value = Request["thoigian"];
                    break;
                case "CH_TIM_KIEM_BANH":
                    cm.Parameters.Add("@TENBANH", SqlDbType.NVarChar, 50).Value = Request["tenbanh"];
                    break;
                case "CH_THEM_NGUYEN_LIEU":
                    cm.Parameters.Add("@MAHOADON", SqlDbType.NVarChar, 50).Value = Request["mahoadon"];
                    cm.Parameters.Add("@TENNGUYENLIEU", SqlDbType.NVarChar, 50).Value = Request["tennguyenlieu"];
                    cm.Parameters.Add("@SOLUONG", SqlDbType.NVarChar, 50).Value = Request["soluong"];
                    cm.Parameters.Add("@DVT", SqlDbType.NVarChar, 50).Value = Request["dvt"];
                    cm.Parameters.Add("@DONGIA", SqlDbType.NVarChar, 50).Value = Request["gia"];
                    break;
                case "CH_HUY_DON":
                    cm.Parameters.Add("@MAHOADON", SqlDbType.NVarChar, 50).Value = Request["mahoadon"];
                    break;
            }
            string json = (string)db.Scalar(cm); //thuc thi SqlCommand cm này để thu về json
            Response.Write(json); //trả json về trình duyệt
        }

        void xuly_chat(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_CHAT", action); //tạo cm với "SP_Company" và @action từ method GetCmd của db
            switch (action)
            {
                case "CHAT_LIST":
                    cm.Parameters.Add("@MA_CHAT", SqlDbType.NVarChar, 50).Value = Request["machat"];
                    break;
                case "CHAT_ADD_DU_LIEU_KHACH":
                    cm.Parameters.Add("@MA_CHAT", SqlDbType.NVarChar, 50).Value = Request["machat"];
                    cm.Parameters.Add("@KHACH_HANG", SqlDbType.NVarChar, 50).Value = Request["khachhang"];
                    break;
                case "CHAT_ADD_DU_LIEU_ADMIN":
                    cm.Parameters.Add("@MA_CHAT", SqlDbType.NVarChar, 50).Value = Request["machat"];
                    cm.Parameters.Add("@ADMIN", SqlDbType.NVarChar, 50).Value = Request["admin"];
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
                case "CH_LIST_BANH":
                case "CH_LIST_NGUYEN_LIEU":
                case "CH_SUA_GIA_NGUYEN_LIEU":
                case "CH_TIM_KIEM_BANH":
                case "CH_ADD_HOA_DON":
                case "CH_ADD_CT_HOA_DON":
                case "CH_DON_HANG_DANG_GIAO":
                case "CH_CHI_TIET_HOA_DON_HOAN_THANH":
                case "CH_CHI_TIET_HOA_DON":
                case "CH_XAC_NHAN_HOA_DON":
                case "CH_UPDATE_XAC_NHAN_DON_HANG":
                case "CH_LIST_HOA_DON_HOAN_THANH":
                case "CH_DOANH_THU":
                case "CH_DA_NHAN_DUOC_HANG":
                case "CH_THEM_NGUYEN_LIEU":
                case "CH_HUY_DON":
                case "CH_ADD_KHACH_HANG":
                    xuly_cuahang(action);
                    break;
                case "CHAT_LIST":
                case "CHAT_ADD_DU_LIEU_KHACH":
                case "CHAT_ADD_DU_LIEU_ADMIN":
                    xuly_chat(action);
                    break;
            }
        }
    }
}