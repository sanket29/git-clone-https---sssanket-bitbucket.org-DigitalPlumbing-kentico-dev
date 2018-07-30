<%@ Control Language="C#" AutoEventWireup="true" CodeFile="~/CMSWebParts/AstroGempak/AG_GayaHidup_Top.ascx.cs" Inherits="CMSWebParts_AstroGempak_AG_GayaHidup_Top" %>
<script src="~/CMSWebParts/AstroGempak/AstroGempak.js"></script>
<div class="dropdownHdr">
<h2 class="subheader" id="top_subheader">BERITA & VIDEO GAYA HIDUP</h2>  

<section>
<select id="selectCat" onchange="myFunction()" class="form-control">
  <option value="c@Gaya_Hidup">Berita & Video Gaya Hidup</option>
  <option value="t@92">Suudu</option>  
</select> 
    </section>
    </div>

<div id="ag_top_container">
<cms:QueryRepeater ID="rptGempakGayaHidupTop" runat="server" QueryName="AstroGempak.ArticleCMS.qGempakArticleByCatByPaging" 
 TransformationName="AstroGempak.ArticleCMS.tGempakInnerTop" CacheMinutes="10" WhereCondition="@CatName='Gaya_Hidup', @MinNo=2, @MaxNo=6" />
</div>



