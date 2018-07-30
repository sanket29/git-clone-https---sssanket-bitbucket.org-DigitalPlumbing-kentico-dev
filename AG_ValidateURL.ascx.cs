using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CMS.FormControls;
using CMS.Helpers;
using CMS.CustomTables;
using CMS.DataEngine;
using CMS.PortalControls;
using CMS.MediaLibrary;
using System.Text.RegularExpressions;


public partial class CMSWebParts_AstroGempak_AG_ValidateURL  : CMSAbstractWebPart
{
    protected void Page_Load(object sender, EventArgs e)
    {
          string url = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Authority + HttpContext.Current.Request.RawUrl;//HttpContext.Current.Request.Url.AbsoluteUri;
        Uri uri;
        if (!Uri.TryCreate(url, UriKind.RelativeOrAbsolute, out uri))
        {
            // it's not a valid URI.
           // Response.Write("Not Valid :" + url);
            Response.Clear();
            Response.StatusCode = 500;
            Response.End();

           

        }
        else
        {
            if (url.Contains('?'))
            {
                var arrUrl = url.Split('?');
                if (arrUrl.Length > 0)
                {
                    bool isvalid = Regex.IsMatch(arrUrl[1], "^[A-Za-z0-9#=&-]+$");
                    if (!isvalid)
                    {
                       // Response.Write("Not Valid :" + arrUrl[1]);
                        Response.Clear();
                        Response.StatusCode = 500;
                        Response.End();
                    }
                    else
                    {
                       // Response.Write("Valid " + arrUrl[1]);
                    }
                }
            }
        }
    }

    private bool IsLocalUrl(string url)
    {
        if (string.IsNullOrEmpty(url))
        {
            return false;
        }
        else
        {
            return ((url[0] == '/' && (url.Length == 1 ||
                    (url[1] != '/' && url[1] != '\\'))) ||   // "/" or "/foo" but not "//" or "/\"
                    (url.Length > 1 &&
                     url[0] == '~' && url[1] == '/'));   // "~/" or "~/foo"
        }
    }
}