using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace TestApp.Infrastructure.Middleware
{
    //http://stackoverflow.com/questions/31415052/angular-2-0-router-not-working-on-reloading-the-browser
    public class Angular2Middleware
    {
        private readonly RequestDelegate _next;

        public Angular2Middleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {

            if (context.Request.Path.HasValue && !context.Request.Path.Value.StartsWith("/api/")
                && !context.Request.Path.Value.Equals("/")
                && !context.Request.Path.Value.Equals("/index.html")
                && !context.Request.Path.Value.Contains("."))
            {
                context.Request.Path = new PathString("/index.html");
            }
                await _next.Invoke(context);

        }
    }
}

