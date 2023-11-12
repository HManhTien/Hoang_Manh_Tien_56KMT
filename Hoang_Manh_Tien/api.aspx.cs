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
                    cm.Parameters.Add("@hoten", SqlDbType.NVarChar, 50).Value = Request["hoten"];
                    cm.Parameters.Add("@pw", SqlDbType.NVarChar, 50).Value = Request["pw"];
                    cm.Parameters.Add("@sdt", SqlDbType.Int).Value = Request["SDT"];
                    break;

                case "US_edit":
                    cm.Parameters.Add("@id", SqlDbType.Int).Value = Request["id"];
                    cm.Parameters.Add("@User_Name", SqlDbType.NVarChar, 50).Value = Request["User_Name"];                 
                    cm.Parameters.Add("@hoten", SqlDbType.NVarChar, 50).Value = Request["hoten"];                 
                    cm.Parameters.Add("@sdt", SqlDbType.Int).Value = Request["SDT"];
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

                case "CH_list_hoa_don":
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
                    xuly_nguoidung(action);
                    break;
                case "CH_list_banh":
                case "CH_list_hoa_don":
                    xuly_cuahang(action);
                    break;
            }
        }
    }
}