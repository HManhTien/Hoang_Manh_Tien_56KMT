using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using SuatAn;

namespace Hoang_Manh_Tien
{
    public partial class api : System.Web.UI.Page
    {
        void xuly_company(string action)
        {
            //khai báo biến db thuộc lớp SqlServer
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_User", action); //tạo cm với "SP_Company" và @action từ method GetCmd của db
            switch (action)
            {
                //2 loại này truyền 5 tham số chung
                case "login_user":       
                    cm.Parameters.Add("@name", SqlDbType.NVarChar, 50).Value = Request["name"];
                    cm.Parameters.Add("@pw", SqlDbType.NVarChar, 50).Value = Request["pw"];
                    break;            
            }
           
            int json = (Int32)db.Scalar(cm); //thuc thi SqlCommand cm này để thu về json
            Response.Write(json); //trả json về trình duyệt
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            switch (action)
            {
                case "login_user":                
                    xuly_company(action);
                    break;
            }
        }
    }
}